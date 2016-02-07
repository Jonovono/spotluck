# SPOTLUCK
Listen to Spotify together, with anyone, anywhere in the world, in real time.

# Install

``` npm install spotluck -g ```

## Usage

### Start a channel

``` spotluck start <channel_id> [--anarchy] ```

  * If no channel_id is specified a random one will be created
  * --anarchy flag is optional (anarchy mode allows anyone to control the player)

### Tune in to a Channel

``` spotluck play channel_id ```


## What?

Spotluck lets you listen to Spotify with other people at the same time. I havn't fully tested it but you should be able to have a bunch of people all synced together. And when I say synched, you are synced to the second of a song.

There are two modes - normal and anarchy. Let me point form it.

### NORMAL

``` spotluck start <channel_id> ```

In normal mode, the person who starts the channel controls everything. 

* If they pause their Spotify, everyone who is listening also pauses.
* If they skips forward/backward in a song, everyone listening also does
* If they change songs, everyone else will change.
* If someone listening tries to do one of the above you will be unable to and you will be synched back up with the channel creator

### ANARCHY

``` spotluck start <channel_id> --anarchy ```

In anarchy mode, the channel creator and anyone who is listening can control everything, like:

* If anyone changes a song, everyone else will start playing that song
* If someone skips in a song, everyone else will.
* However, if someone (even channel creator) pauses, only they will. And when they play next they will be syched up.





