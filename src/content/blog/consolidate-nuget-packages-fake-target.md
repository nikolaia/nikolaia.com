---
title: Ensuring that NuGet Packages (packages.config) are consolidated with a FAKE target
description: An article about ensuring that NuGet packages listed in packages.config are consolidated using a FAKE target.
author: Nikolai Norman Andersen
pubDatetime: 2018-10-08T17:23:40Z
slug: ensuring-nuget-packages-consolidated-fake-target
featured: false
draft: false
tags:
  - nuget
  - fake
  - ci
---

This is a simple F# Make (FAKE) target for ensuring that NuGet packages are the same version across projects in a solution. Wrote this for a .NET Framework project and thought I'd share it:

```fsharp
type PackageReferenceFile = NuGet.PackageReferenceFile
Target "NuGetPackagesConsolidated" <| fun _ ->
    !! (sprintf "./src/%s*/packages.config" appName)
    -- "**/obj/**/packages.config"
    |> Seq.map PackageReferenceFile
    |> Seq.collect (fun prf -> prf.GetPackageReferences())
    |> Seq.groupBy (fun pr -> pr.Id)
    |> Seq.filter (fun p -> (snd p |> Seq.distinct |> Seq.length) > 1 )
    |> Seq.map (fun p -> fst p , snd p |> Seq.distinct)
    |> function
        | packages when packages |> Seq.isEmpty -> ()
        | packages ->
            seq {
                yield "The following packages are not consolidated:"

                for (k,v) in packages do
                    yield (sprintf "    Package: %s Versions: %A" k v)

                yield "You need to consolidate packages across the solution:"
                yield "    * Right click on the solution inside VS"
                yield "    * Choose Manage NuGet Packages for Solution"
                yield "    * Choose the Consolidate tab"
                yield "    * Make sure you sync the package versions" }
            |> Seq.iter (printfn "%s")
            failwith "Packages not consolidated"
```
