---
title: Unreal Engine's Blueprints VS C++
date: 2026-10-21
description: My thoughts on Unreal Engine's Blueprints and C++
image: blog/images/UE5.jpg
---
This post is about my personal preferences and experiences as a student, ranting a bit about Unreal Engine's C++ framework and its own visual programming tool: Blueprints.

# What's up with Blueprints?

Blueprints are a very powerful tool for beginner developers, or for people who have just started with Unreal and aren't familiar with any programming language.

My whole experience with Unreal Engine started **3 years** ago in college, where I was introduced to the engine and we started making a simple 2D platformer game. It was a beginner-friendly experience for the most part. Maybe I had it easier than others thanks to my familiarity with Python. Python isn't directly involved in the game development pipeline inside Unreal's editor, but it did help me with basic principles like *variables, for-loops, arrays, comments and functions*. So Blueprints didn't push me to learn as much as I needed, and they're very easy to understand most of the time.

Even though Epic has announced that Blueprints will eventually be deprecated in Unreal Engine 6, they're still widely used across the engine, and not just in game development but also in the film industry, science projects and simulations.

### Why I like Blueprints

Blueprints appeared in Unreal Engine 4 and made a huge difference in game creation by lowering the entry bar for beginners. Without them, many developers wouldn't be here today. It's something people take for granted, forgetting how much work Unreal Engine does for them under the hood. You rarely think about how the engine compiles Blueprints into bytecode that its virtual machine can run. It does this in seconds, so you can play with an idea for a couple of minutes and then change the whole thing back again.

### How I use Blueprints in my projects

My workflow changes from project to project, and I'm still developing my coding paradigm and my way of thinking about problems and choosing approaches. But I usually try to stick to these three principles:

- **Write clear code and comment it regularly, as if you were in a team**
- **Try different approaches to the same problem, maybe you're overthinking it**
- **Set reasonable deadlines and MVP (Minimum Viable Product) goals**

In my first year at Leeds Beckett University, for one of my game design assignments, I was tasked with producing a prototype, which I called "Rooftop Farmer". In that project I used Blueprints exclusively, along with techniques such as Interfaces for interacting with objects around the player, Timers for vegetables that grow over time, and Widgets for tooltips over objects.

# How C++ makes a difference

On the other hand, C++ gives you absolute control over your project and even over the engine as a whole. Unreal's source code is available to everyone, so with enough technical knowledge you can write your own custom nodes and functions, tweak the engine for your own needs, or even improve it for the community, although I'm far from that.

Unlike Blueprints, C++ has better runtime performance, and I find it easier to read code line by line than to dive into spaghetti graphs myself.

### Why I like C++

I enjoy writing in C++ because it challenges you to think through each step before executing it. For many people C++ syntax may be very frustrating to write, but for me personally, once you get along with it for a few weeks, you start to notice patterns and understand how things get rollin' with it. It's also easy to refactor if you need to change anything. This is one of the main differences with Blueprints: it may take you quite a while to figure out which node to disconnect to fix something, especially in a big project, and suddenly writing code becomes cable management, which is not really fun.

Of course, it has its own downsides. Readability, total control and precision of execution all become your responsibility, and so does time: while it may be easier to write something in C++, it can take longer. Code executes faster, but writing it can take more time, especially if you're a beginner like me.

### How I use C++ in my projects

My first C++ project in Unreal was CryoCannon-Component, a weapon component that can create Ice Walls for defense and shoot a freeze ray that spawns Spikes, which can damage AI enemies. It was a fun two-week project and it took lots of time to get things working. At first I made it in Blueprints, so I could later rewrite it in C++ while looking at an existing solution.

There was one concrete problem: I had never used Niagara before, so making my own VFX was tricky, and connecting it to my code was really difficult. In the end I managed it by doing research online and reading the Unreal documentation. I learned a lot from this project: enums, line traces, and using Niagara inside of C++.

Here's an excerpt of how I did it:

```cpp
NiagaraIceBeam->Activate();
FVector BeamEndValue = OutHit.bBlockingHit ? OutHit.ImpactPoint : OutHit.TraceEnd;
NiagaraIceBeam->SetVariableVec3(FName("Beam End"), BeamEndValue);

// Ice Spike Spawning Logic
// Only spawn spikes if we have a valid hit, the cooldown is ready, and the class is assigned.
if (bHit && bCanSpawnIce && IceSpikeClass)
{
    bCanSpawnIce = false;

    FVector SpawnLocation = OutHit.ImpactPoint;
    FRotator SpawnRotation = FRotationMatrix::MakeFromZ(OutHit.ImpactNormal).Rotator();

    FActorSpawnParameters SpawnParams;
    SpawnParams.Owner = GetOwner();

    AActor* SpawnedSpike = GetWorld()->SpawnActor<AActor>(IceSpikeClass, SpawnLocation, SpawnRotation, SpawnParams);

    if (SpawnedSpike)
    {
        // Apply randomized scale for visual variety
        float RandomScale = FMath::FRandRange(150.f, 250.f);
        SpawnedSpike->SetActorScale3D(FVector(RandomScale));
    }

    // Handle cooldown
    GetWorld()->GetTimerManager().SetTimer(IceSpawnCooldown, this, &UUIceGunComponent::IceCooldown, 0.1f, false);
}
```

# Summary

At the end of the day, C++ and Blueprints co-exist in one ecosystem and each has its place. As a rule, you might want to use Blueprints for fast prototyping and for gameplay mechanics that are easy to make and don't require lots of calculations, while C++ can be used for heavy-lifting stuff such as AI, for instance. I think you should aim to use both technologies together, but only where your project actually needs it. Maybe you will end up adding C++ because Blueprints are getting messy or you have a performance issue.

- **Blueprints:** fast prototyping and simple gameplay mechanics
- **C++:** heavy-lifting, performance-critical systems, and when Blueprints get messy

With Epic planning to move away from Blueprints in the future, it will be interesting to see how this changes. But I think understanding what's happening under the hood, which C++ teaches you, will stay valuable either way.