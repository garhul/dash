## *NOTE: this project is under irregular maintenance, it is not a finished product and as such it is subject to significant changes, this is just a test platform for random ideas*

# About this project
I started this project first as a simple way to control some wifi connected led lights (aurora)[https://github.com/garhul/aurora] via an MQTT interface, then it also started collecting information from (weather stations)[https://github.com/garhul/weather_stations], and as an experimental platform for some home automation ideas.

## Infrastructure
Home Dashboard was originally intended to be run in an RPI with acess to an MQTT broker, though now it is running on a minipc server with an ssd.
There's no database requirement and server state is kept in simple json files.

The app is now meant to be run in a docker container, so it should be easy to set up as a service running in an RPI
*Please keep in mind that if persistence is enabled then this may mean a lot of write/reads to the rpi sd card and thus resulting in a shorter lifespan*

## Scripts
In the scripts folder there's a few helpful scripts, refer to the readme file in that folder for instructions on each one of those


## How does it work?
Images will come once I find a satisfactory solution for doing a diagram, and not less important, the time to do so.

So a brief explanation goes like this:
The server connects to a mosquito broker and can perform a scan on a given ip address range for detecting [aurora devices](https://github.com/garhul/aurora).

These devices expose an info endpoint which provides a json with relevant device info, after detecting a valid response from such endpoint the server will then add this info to a list and notify connected clients of device list changes. 

The client then will render a control widget for the given device and expose some controls, these controls emit a command via an REST api endpoint to the MQTT broker and when the device state chages it will announce such changes in an announcement channel which the server is subscribed to, after a change message is received the server will update the data for that device and notify the client, reflecting the changes.


It also collects information from (weathers stations)[https://github.com/garhul/weather_stations], and presents them on a simple timeseries plot


## How to run it?
Check scripts/start.sh

- prequisites:
  - nx
  - mqtt broker
  - docker

## How to start a dev env:
The repo uses NX to leverage mono repo, and since many refactors are ongoing there isn't a proper set of build / startup scripts to get a dockerized image, so for the time being
runnint `nx run-many --parallel --target=serve --projects=frontend,backend` should be enough, you may need to use `npx nx...` if you don't have nx accessible in your path

