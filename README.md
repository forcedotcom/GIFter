# GIFter

The GIF-to-Chatter app for Lightning Platform you didn't know you needed!

This repo was developed for the [Quick Start: Unlocked Packages](https://trailhead.salesforce.com/projects/quick-start-unlocked-packages?trailmix_creator_id=00550000006yDdKAAU&trailmix_id=dreamforce-18-how-build-your-first-sfdx-app-with-unlocked-pkg) Trailhead project.

![image](https://user-images.githubusercontent.com/746259/36634388-9d7b0b9e-1958-11e8-83df-dfc65ace47b3.png)

## Get a GIPHY API Key

Go to [https://developers.giphy.com/](https://developers.giphy.com/) and create an new app. Grab the API Key and update the `apiKey` in `force-app/main/default/GIPHY.resource`.

## Create an Unlocked Package

Create an Unlocked package:

```
sfdx force:package:create -n GIFter -d "Using GIPHY to find GIFs and post to Chatter" -r force-app -t Unlocked -v DevHub
```

This will only take a moment, and you'll have the following output:

```
=== Ids
NAME                   VALUE
─────────────────────  ──────────────────
Package Id             0Hoxxx
```

Grab the `Package Id`.

Open the `sfdx-project.json` file.
Notice that the `package:create` command updates the project file to include important details about the package. In `packageDirectories`, you can see the package name you defined, with placeholders for the version name and version number. The command also creates a `packageAliases` section, which maps the package name (alias) to its corresponding package ID (`0Ho`).

Now, create a version of your package:

```
sfdx force:package:version:create -p GIFter -d force-app -k test1234 --wait 10 -v DevHub
```

This will take a few moments. When complete, you'll have a message like the following:

```
Successfully created the package version [08cxxx]. Subscriber Package Version Id: 04txxx.
Package Installation URL: https://login.salesforce.com/packaging/installPackage.apexp?p0=04txxx
As an alternative, you can use the "sfdx force:package:install" command.
```

Grab the last ID that starts with `04t` as that's what we'll use when installing into a new environment.

Create a new scratch org:

```
sfdx force:org:create -s -f config/project-scratch-def.json
```

Install the package version:

```
sfdx force:package:install --wait 10 --publishwait 10 --package GIFter@0.1.0-1 -k test1234 --noprompt
```

Assign the permission set:

```
sfdx force:user:permset:assign -n GIFter
```

Open the app:

```
sfdx force:org:open -p //lightning/n/GIFter
```

Enjoy!
