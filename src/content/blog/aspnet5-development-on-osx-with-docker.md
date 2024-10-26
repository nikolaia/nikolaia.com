---
title: ASP.NET 5 in Docker on OS X
description: An article about running ASP.NET 5 applications in Docker on OS X.
author: Nikolai Norman Andersen
pubDatetime: 2015-02-15T18:18:00Z
slug: aspnet-5-in-docker-on-osx
featured: false
draft: false
tags:
  - aspnet
  - docker
  - osx
---

At the time of writing ASP.NET 5 (Previously vNext, now officially called ASP.NET 5) is in beta 2, with a beta 3 still under development. In this post we will prepare ourselves for the first RTM (Release to market) version by looking at how to get a development environment for ASP.NET 5 up and running on Mac OS X. We will also be looking at utilizing the now available power of Docker containers to host our ASP.NET 5 apps.

Most of what is written here is probably easy to adopt over to both Windows and Linux. I assume you are somewhat familiar with package managers like [Homebrew](http://brew.sh/) and [NPM](https://www.npmjs.com/), and that you at least have heard about [Docker](https://www.docker.com/) and what it offers.

You can install ASP.NET 5 following the instructions on the official ASP.NET [github repository](https://github.com/aspnet/Home). The version used in this post is 1.0.0-beta2.

## Why not use Visual Studio and IISExpress

Having ASP.NET 5 running with command line tools enables people that prefer to use Sublime, VIM or any other text editor to work on, build and test your project without installing "the monster" that is Visual Studio. This is especially handy when you have front-end developers on you project that are Mac OS X based and that don't have much experience with the .NET stack and tools. We will end up with a project that is editor/IDE and OS independent.

Using Docker lets us host on a \*nix system, which is often cheaper. Running our solution in containers also enables us to test locally in an environment that is equal to the production one. The container is going to be the same no matter where you host it, be it locally or in the Cloud. It also enables us to run tests using network communication between containers as if it were a real world scenario. Another plus is that we don't have to pollute our own machine by installing all the project dependencies. We keep them isolated in the container. Most people solve this problem today by running one virtual machines per project.

## The editor, IntelliSense and scaffolding

Sublime Text is by far the most popular editor for OS X, and it now has excellent support for ASP.NET 5 / vNext. Both packages we need can be installed through the [Package Manager](https://sublime.wbond.net/installation):

- [Kulture](https://github.com/ligershark/Kulture) gives a _build system_ for ASP.NET 5 inside Sublime, highlighting and a lot of other snacks for vNext developers. It has regular contributions from people inside Microsoft.
- [OmniSharp](https://github.com/OmniSharp/omnisharp-sublime) also has Microsoft people contributing to it and gives you IntelliSense inside of Sublime! It also gives you a lot of other features that you would miss coming from Visual Studio like Error Highlighting, Goto implementation, Auto Completion etc. It's being rebuilt to use Roslyn for code analysis.

After installing the packages we have a few more steps to go through before we have our editor ready. The first is installing the Yeoman scaffolder. It's what we are going to use to create new ASP.NET 5 project, Controllers etc. - it's basically our File - New Item menu option in the terminal!

```shell
npm install -g yo
npm install -g generator-aspnet
```

We can now simply run the following command in a folder of our choice to create a new project:

```shell
yo aspnet
```

To get the IntelliSense/Omnisharp working we either have to have a _.sln_ file in our project or a _.sublime-project_ file. I prefer the last one (_.sln_ files are a thing of the past!). In Sublime click _Project_ in the menu and choose _Save project as_. Save the file in the root folder of your newly created project. Now reopen Sublime and open the project by using _Open Project_ from the _Project_ menu. Intellisense should now be in place when you click _ctrl+space_.

To get the IntelliSense to trigger on dots go to

- _Preferences_
- _Settings - More_
- _Syntax Spesific - User_

and enter the following:

```json
{
  "auto_complete": true,
  "auto_complete_selector": "source - comment",
  "auto_complete_triggers": [{ "selector": "source.cs", "characters": ".<" }]
}
```

## Docker

Easiest thing to do is install the tools via Homebrew, but remember to update your sources first so you don't get old versions of the software.

```shell
brew update
```

The technologies we are playing with are immature. Improvements and bug fixes are being released regularly, and it's important to keep up to date with both boot2docker, the Docker CLI and ASP.NET5.

### The Docker host

Our Docker host will be boot2docker. It's a lightweight linux distro made especially to run Docker containers on Mac OS X. The reason we need it is because unlike Linux, Mac OS X can't be a Docker host natively. So we need to run a virtual machine to be to host. Boot2docker has a dependency on [VirtualBox](https://www.virtualbox.org/), so go install that first, then open your terminal and write:

```shell
brew install boot2docker
```

Boot2Docker uses the VirtualBox API and takes care of everything related to the virtual machine. To provision our host we simply run `boot2docker init`. This will provision from the boot2docker .ISO file. Then we simply run `boot2docker up` to start the VM and get the environment variables needed by the Docker client (We'll get to the specifics on the client in the next section). You might have to run the commands to set the environment variables yourself, but they will be provided for you by boot2docker as shown below:

```shell
$ boot2docker up
Waiting for VM and Docker daemon to start...
.....o
Started.
Writing /Users/nikolaia/.boot2docker/certs/boot2docker-vm/ca.pem
Writing /Users/nikolaia/.boot2docker/certs/boot2docker-vm/cert.pem
Writing /Users/nikolaia/.boot2docker/certs/boot2docker-vm/key.pem

To connect the Docker client to the Docker daemon, please set:
    set -x DOCKER_HOST tcp://192.168.59.103:2376
    set -x DOCKER_CERT_PATH /Users/nikolaia/.boot2docker/certs/boot2docker-vm
    set -x DOCKER_TLS_VERIFY 1
```

You can read more about boot2docker at their website or on GitHub:

- [boot2docker.io](http://boot2docker.io)
- [github.com/boot2docker](https://github.com/boot2docker)

### The Docker client

Now that we have a host, we are going to need the client to communicate with it. Unlike the host, the Docker client will run natively on Mac OS X. It's a CLI to talk with the hosts REST API from the terminal. It should have been installed as a dependency for boot2docker, but try to install it using Homebrew to be sure:

```shell
brew install docker
```

The `boot2docker up` command gave us all the environment variables we need to communicate with the host from the CLI, and we can test that everything is up and running by simple running the command `docker info`

If boot2docker for some reason didn't set the variables for you, try running the following bash command: `$(boot2docker shellinit)` to get the variables again.

```shell
$ docker info
Containers: 1
Images: 21
Storage Driver: aufs
 Root Dir: /mnt/sda1/var/lib/docker/aufs
 Dirs: 23
Execution Driver: native-0.2
Kernel Version: 3.16.7-tinycore64
Operating System: Boot2Docker 1.4.0 (TCL 5.4); master : 69cf398 - Fri Dec 12 01:15:02 UTC 2014
Debug mode (server): true
Debug mode (client): false
Fds: 23
Goroutines: 31
EventsListeners: 0
Init Path: /usr/local/bin/docker
```

## Creating a base image

To make life easy for ourselves we are going to create a base ASP.NET 5 image that all our ASP.NET 5 apps can reuse, and we are going to base it on the official [Dockerfile](https://github.com/aspnet/aspnet-docker) provided by Microsoft. The Dockerfile should look like this:

```dockerfile
FROM mono:3.10

ENV KRE_VERSION 1.0.0-beta2
ENV KRE_USER_HOME /opt/kre

RUN apt-get -qq update && apt-get -qqy install unzip

RUN curl -sSL https://raw.githubusercontent.com/aspnet/Home/v$KRE_VERSION/kvminstall.sh | sh
RUN bash -c "source $KRE_USER_HOME/kvm/kvm.sh \
  && kvm install $KRE_VERSION -a default \
  && kvm alias default | xargs -i ln -s $KRE_USER_HOME/packages/{} $KRE_USER_HOME/packages/default"

# Install libuv for Kestrel from source code (binary is not in wheezy and one in jessie is still too old)
RUN apt-get -qqy install \
  autoconf \
  automake \
  build-essential \
  libtool
RUN LIBUV_VERSION=1.0.0-rc2 \
  && curl -sSL https://github.com/joyent/libuv/archive/v${LIBUV_VERSION}.tar.gz | tar zxfv - -C /usr/local/src \
  && cd /usr/local/src/libuv-$LIBUV_VERSION \
  && sh autogen.sh && ./configure && make && make install \
  && rm -rf /usr/local/src/libuv-$LIBUV_VERSION \
  && ldconfig

ENV PATH $PATH:$KRE_USER_HOME/packages/default/bin
```

This basicly does three things that are worth noticing:

1. Inherits from the official Mono Docker image. This means it will fetch the dockerfile from [GitHub](https://github.com/mono/docker), build that image and use it as the base for the new image we are making. Think of it as inheritance.
1. Fetch the 1.0.0-beta2 version of ASP.NET 5
1. Install the minimum needed dependencies to run ASP.NET 5 on Linux.

Running `docker build -t aspnet .` in the same folder as the above Dockerfile will generate the image and tag it as `aspnet`. If we now run `docker images` we should have both the _mono_ image and the new _aspnet_ image listed.

Awesome! We now have a base ASP.NET 5 image that all our apps can inherit from. No duplication and easily maintainable.

Now let us jump into a new folder and create a test project by running `yo aspnet`. We will go for a MVC application and call it `src` for the sake of simplicity. Then we add the following `Dockerfile` at the same level as the `src` directory:

```dockerfile
FROM aspnet

ADD src /app/
WORKDIR /app

RUN kpm restore
EXPOSE 5004

ENTRYPOINT ["k", "kestrel"]
```

This is the recipe for a docker image that is specific for the application we just generated. It will do the following:

1. Use the previously made _aspnet_ docker image as the base (which again uses the _mono_ image). An important point here is that if you are not doing any changes to the _aspnet_ Dockerfile, you should reference it directly from microsofts own repo using `FROM microsoft/aspnet`.
1. Make the `src` directory available under `/app/`. Be aware that it copies the content.
1. Set `/app` as the working directory and run `kpm restore` to restore NuGet packages.
1. Expose port 5004, which is the standard port used by the `k kestrel` command in a freshly scaffolded Yeoman MVC project.
1. Instruct the container to start the `k kestrel` command when booting up.

After building the image with `docker build -t mvcapp .`, running `docker images` should return a total of three images:

```shell
$ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
mvcapp              latest              3cbcd167085b        3 days ago          538.2 MB
aspnet              latest              d5b62bb8b622        3 days ago          479.4 MB
mono                latest              6d5034208a17        10 days ago         348.6 MB
```

We can now run our app image in a Docker container on our previously installed host (Boot2docker) by running

```shell
docker run -i -p 5004:5004 -t mvcapp
```

The `-i` flag stands for interactive. It let us follow the output and kills the container when we quit the terminal session.

To make sure that port 5004 can be reached we have to forward it from our container to our docker host with the `-p 5004:5004` flag.

Finally we specify the image we are going to run with the `-t` flag.

After running the command, the terminal window should be displaying the `Started...` message that the Kestrel web server spits out after successfully starting up. To find the IP of the host you can run `boot2docker ip`. Your app should be reachable from `http://{HostIP}:5004`.

If you want to use `localhost` instead of the host IP, remember that the VM is running on VirtualBox and you can simply port forward it to your machine through the VirtualBox API:

```shell
VBoxManage modifyvm "boot2docker-vm" --natpf1 "tcp-port5004,tcp,,5004,,5004";
```

## Automatic builds inside the docker container

Now let's look at automatically updating the app running in the container when you do changes in your project.

The first step is mapping your local project folder into the container instead of copying it. We do that with a simple twist on the `docker run` command:

```shell
docker run -i -p 5004:5004 -v /Absolute/path/to/project/src/:/app/ -t mvcapp
```

There are already some great options for watching source files and re-running the `k` commands:

One based on nodemon that does this for node.js projects [github.com/henriksen/kmon](https://github.com/henriksen/kmon/).

Or if you are using Gulp for front end tasks you can look at this Gulp plugin: [github.com/tugberkugurlu/gulp-aspnet-k](https://github.com/tugberkugurlu/gulp-aspnet-k).

The only difference in our approach is that we want to compile and then restart the web server inside the docker container, not on our own machine. We also want to do it without adding any tools inside the container, since we want to be able to push the image straight into production without making changes or building another special image.

Setting up the watch of the project folder I'll leave as an exercise for you, but here are some tips for the commands you'll want to run.:

```shell
kpm build
docker restart mvcapp
```

The `kpm build` command can be run outside the container if you have your project folder mapped into the container.

Another alternative could be to kill the kestrel server and restart it using the fairly new `docker exec` command, but this I haven't tested yet:

```shell
docker exec mvcapp bash -c "kill -9 $(pidof k)"
docker exec mvcapp k kestrel
```

## Conclusion

Knowing you way around the command line tools of ASP.NET 5, and knowing the basics of hosting apps inside containers, is vital if you want to keep up with the latest developments in the new, modern and open-source .NET stack.

Think of the time you spend with the concepts and tools mentioned in this blog post as investments for the future. You will definitely be using this in job projects in a few years!
