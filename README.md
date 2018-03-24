# GIFter

The GIF-to-Chatter app for Lightning Platform you didn't know you needed!

![image](https://user-images.githubusercontent.com/746259/36634388-9d7b0b9e-1958-11e8-83df-dfc65ace47b3.png)

## Get a GIPHY API Key

Go to [https://developers.giphy.com/](https://developers.giphy.com/) and create an new app. Grab the API Key and update the `apiKey` in `force-app/main/default/GIPHY.resource`.

## Create an Unlocked Package

Create an Unlocked package:
```
sfdx force:package2:create -n GIFter -d "Using GIPHY to find GIFs and post to Chatter" -o Unlocked
```

This will only take a moment, and you'll have the following output:

```
=== Ids
NAME                   VALUE
─────────────────────  ──────────────────
Package2 Id            0Ho6A0000004C9hSAE
Subscriber Package Id  0336A0000001JQ6QAM
```
Grab the `Package2 Id`.

Open the `sfdx-project.json` file and replace `YOUR_PACKAGE_ID` with the ID from above (e.g. `0Ho6A0000004C9hSAE`).

Now, create a version of your package:
```
sfdx force:package2:version:create -d force-app --wait 10
```

This will take a few moments. When complete, you'll have a message like the following:

```
Successfully created the package2 version [08c6A0000004CFWQA2]. Package2 Version Id: 05i6A000000CaSoQAK.
Subscriber Package2 Version Id: 04t6A000001aR9rQAE.
```

Grab the last ID that starts with `04t` as that's what we'll use when installing into a new environment.

Create a new scratch org:

```
sfdx force:org:create -s -f config/project-scratch-def.json
```

Install the package version:

```
sfdx force:package:install -i 04t6A000001aR9rQAE --wait 10
```

Assign the permission set:

```
sfdx force:user:permset:assign -n GIFter
```

Open the app:

```
sfdx force:org:open -p one/one.app#/n/GIFter
```

Enjoy!