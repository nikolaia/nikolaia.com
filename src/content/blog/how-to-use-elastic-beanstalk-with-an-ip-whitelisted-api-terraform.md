---
title: Static outgoing IP for public Elastic Beanstalk with Terraform
description: An article about configuring a static outgoing IP for a public Elastic Beanstalk environment using Terraform.
author: Nikolai Norman Andersen
pubDatetime: 2020-02-20T10:57:00Z
slug: static-outgoing-ip-elastic-beanstalk-terraform
featured: false
draft: false
tags:
  - elastic-beanstalk
  - terraform
  - devops
---

The classical problem of needing a static IP so you can be whitelisted to access an external API. Only problem is the app is on a public _AWS Elastic Beanstalk_ instance, and I doubt they want to open up for all of AWS. I was afraid I would have to make a EC2 proxy for this, but then I came over this excellent solution to the problem: [How to use Elastic Beanstalk with an IP Whitelisted API](https://medium.com/@obezuk/how-to-use-elastic-beanstalk-with-an-ip-whitelisted-api-69a6f8b5f844)

I'm not gonna write again what is written in that post, but instead of the point and click approach we'll do it with Terraform. This only works if the external system that you want to whitelist also has a static IP/CIDR-block. But who would demand you have a static IP, and have a dynamic IP themselves? That's just evil!

In my case I'm using the regions default VPC. We start by making our default VPC available in terraform, as we need the _id_:

```terraform
data "aws_vpc" "default" {
  default = true
}
```

Then we will simply go through the steps from the post I linked and write the terraform code:

> Step 1: Create a new subnet and give it a suitable CIDR block. I used 172.31.128.0/20.

```terraform
resource "aws_subnet" "nat_subnet" {
  vpc_id     = data.aws_vpc.default.id
  cidr_block = "172.31.128.0/20"
}
```

> Step 2: Create a new NAT Gateway in the new subnet

For this and the next step we will need the default internet gateway of the VPC:

```terraform
data "aws_internet_gateway" "default" {
  filter {
    name   = "attachment.vpc-id"
    values = [data.aws_vpc.default.id]
  }
}
```

Now we can create a elastic IP and a NAT gateway with the eIP allocated to it:

```terraform
resource "aws_eip" "nat_ip" {
  vpc        = true

  depends_on = [data.aws_internet_gateway.default]
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_ip.id
  subnet_id     = aws_subnet.nat_subnet.id

  depends_on = [data.aws_internet_gateway.default]
}
```

> Step 3: Create a Route Table for the new NAT Gateway. This should be configured to send internet traffic out via the Internet Gateway.

```terraform
resource "aws_route_table" "nat_route" {
  vpc_id = data.aws_vpc.default.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = data.aws_internet_gateway.default.id
  }
}
```

> Step 4: Modify the NAT subnet to use your new route table.

Luckily terraform has an association resource for just this:

```terraform
resource "aws_route_table_association" "nat_route_table_association" {
  subnet_id      = aws_subnet.nat_subnet.id
  route_table_id = aws_route_table.nat_route.id
}
```

> Step 5: Modify the Main Route Table to direct traffic to your target server via the NAT Gateway and direct other internet traffic via the Internet Gateway.

The _Id_ of the main route table is available on the _VPC_ , so no magic needed. We just add a route to it with a `aws_route` resource:

```terraform
resource "aws_route" "main_route_table_nat_route" {
  route_table_id         = data.aws_vpc.default.main_route_table_id
  destination_cidr_block = var.cidr_block_to_remote_api
  nat_gateway_id         = aws_nat_gateway.nat_gw.id
}
```

Done. `terraform apply` and outgoing traffic to the given _CIDR block_ will have a static IP that can be opened in an external systems firewall.

As mentioned in the original post this has no fallback. Works for me since the environment that was blocked was just a test environment. If you want a fallback you can make a _NAT gateway_ per _availability zone_ instead of one for the entire _VPC_

Bonus in case someone has the same issue: Had to filter out the new NAT subnet some places where I was fetching all default VPC subnets for the region. This filter will ignore the new subnet:

```terraform
data "aws_subnet_ids" "default" {
  vpc_id = data.aws_vpc.default.id
  filter {
    name   = "default-for-az"
    values = [true]
  }
}
```
