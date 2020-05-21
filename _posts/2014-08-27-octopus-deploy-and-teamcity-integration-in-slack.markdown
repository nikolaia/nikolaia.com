---
layout: single
title: "TeamCity and Octopus Deploy in Slack"
date: 2014-08-27 14:06:00
---

I'm a .NET developer, so my Continuous Delivery tools of choice are TeamCity and Octopus Deploy, but neither has an integration option in the chat client Slack. Let's fix that!

Slack has been widely adopted lately because of the intense IRC nostalgia it invokes in people, but its main selling point(s) are integrations. Integrations in a functional and good looking chat client. So yeah, NOT HipChat (shots fired).

I'm a .NET developer, so my _Continuous Delivery_ tools of choice are TeamCity and Octopus Deploy, but neither has an integration option in Slack (TeamCity is available to vote for as an upcoming integration).

!['slackclient.png'](/assets/images/slackclient.png)

For those who are not familiar with these tools: TeamCity is a build server (some would prefer to call it an all-in-one pre-integrated solution) and Octopus Deploy is a deployment automation system. They usually play together in the following way:

TeamCity starts a new build every time a checkin happens in the source-control. In the last step of the build, it packs the solution into a package and sends it to Octopus Deploy. It then automatically deploys the package to the test environment. Now we can simply push a button to have the same package _promoted_ to the QA environment, and later to the production environment.

So we have a nice chat client and a smooth deployment pipeline, but no integration between them. Luckily for us we can fix that with Slacks webhook support.

To solve the problem I choose PowerShell. It's supported as steps in both TeamCity and Octopus Deploy, and I get access to a lot of variables (Build number, version control hash and so on). Please note that I'm no expert at PowerShell, so this should be considered a proof of concept rather than a solution!

I put the following snippet as the first and last step in TeamCity, the last one only running if all other steps were successful:

```powershell
$WebhookText = $("STARTING: Building %env.TEAMCITY_BUILDCONF_NAME% %build.number%")
$Body = $('payload={"channel": "#channel", "username": "TeamCity", "text": "' + $WebhookText + '", "icon_emoji": ":construction:"}' )
Invoke-RestMethod -Uri https://YOUR_SLACK.slack.com/services/hooks/incoming-webhook?token=TOKEN -Method Post -Body $Body
```

_STARTING_ should be replaced by _SUCCESS_ in the last step. But what if it fails? We'll come back to that later! First let's look at Octopus Deploy:

```powershell
$WebhookText = $("Deploying " + $OctopusParameters['Octopus.Action[OCTOPUS_DEPLOY_STEP_NAME].Package.NuGetPackageId'] + " " + $OctopusParameters['Octopus.Action[OCTOPUS_DEPLOY_STEP_NAME].Package.NuGetPackageVersion'] + " to " $OctopusParameters['Octopus.Action[OCTOPUS_DEPLOY_STEP_NAME].TargetRoles'])
$Body = $('payload={"channel": "#channel", "username": "Octopus Deploy", "text": "' + $WebhookText + '", "icon_emoji": ":space_invader:"}' )
Invoke-RestMethod -Uri https://YOUR_SLACK.slack.com/services/hooks/incoming-webhook?token=TOKEN -Method Post -Body $Body´
```

The same script, but with variables to show us the ID of the package that is being deployed, and to which environment(s). Octopus Deploy lets us easily put in a Powershell step before the deploy, and steps for success and potential failures at the end. Piece of cake!

TeamCity doesn't make it _that_ easy for us. It's simply not possible to add a build step that triggers only if the build fails, so here we have to be a bit more creative:

```powershell
$request = [System.Net.WebRequest]::Create("http://YOUR_TEAMCTIY_HOST/guestAuth/app/rest/builds/%teamcity.build.id%")
$xml = [xml](new-object System.IO.StreamReader $request.GetResponse().GetResponseStream()).ReadToEnd()
Microsoft.PowerShell.Utility\Select-Xml $xml -XPath "/build" | % { $status = $_.Node.status }

if ($status -eq "FAILURE" -or $status -eq "UNKNOWN") {
    $WebhookText = $("FAILURE/UNKNOWN: Building %env.TEAMCITY_BUILDCONF_NAME% %build.number%");
    $Body = $('payload={"channel": "#channel", "username": "TeamCity", "text": "' + $WebhookText + '", "icon_emoji": ":construction:", "color": "danger"}' );
    Invoke-RestMethod -Uri https://YOUR_SLACK.slack.com/services/hooks/incoming-webhook?token=TOKEN -Method Post -Body $Body
}
```

Here we use the TeamCity API to check if the build failed, or was stopped, using the guestAuth account. This build-step should be the last and should run even if other steps fail. Don't forget add FAILURE to your list of highlighted words in Slack! Some credit for this code goes to the comment section here: http://youtrack.jetbrains.com/issue/TW-17002.

Here is a screenshot of the result:

!['Octopus and TeamCity in Slack'](/assets/images/slack_integrations-1.png)

All of this feels a bit hacky, and there is room for refactorings and improvements, but hey: It works!

_FYI: I tried using the widely popular TeamCity webhooks plugin, but it doesn't have any configuration options to make it fit Slacks JSON format for webhooks._

EDIT: The TeamCity webhooks plugin has been forked to fit Slack:

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" lang="en"><p><a href="https://twitter.com/nikolaiii">@nikolaiii</a> You should totally use my <a href="https://twitter.com/teamcity">@teamcity</a> plugin to notify <a href="https://twitter.com/SlackHQ">@SlackHQ</a> <a href="https://t.co/yyibwWfbHA">https://t.co/yyibwWfbHA</a></p>&mdash; Peter Goodman (@petegoo) <a href="https://twitter.com/petegoo/statuses/504924891590565889">August 28, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
