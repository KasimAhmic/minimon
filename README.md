<div align="center">
   <svg width="128" height="128" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 66 66">
      <path
        style="fill: #000; stroke: #fff; stroke-width: 0.5"
        d="m 9.3503321,54.658881 h 0.031254 l 4.2192579,-4.219258 1.062628,-1.062628 c 0.09332,-0.09345 0.33726,-0.261282 0.337322,-0.406299 6.3e-5,-0.156894 -0.295973,-0.394735 -0.399954,-0.500061 -0.391797,-0.39661 -0.758341,-0.818848 -1.111759,-1.25015 C 12.253557,45.713116 11.207337,44.067917 10.358516,42.313643 7.7803617,36.985189 7.3144305,30.647768 9.0698296,24.999056 c 0.9322994,-3.000018 2.4273554,-5.789511 4.4192514,-8.219741 1.653293,-2.017118 3.647971,-3.76436 5.862456,-5.143589 7.651641,-4.7655114 17.707448,-4.8162987 25.346806,0.01963 2.278087,1.442205 4.321458,3.236046 6.006974,5.342737 1.903667,2.379631 3.372906,5.110491 4.253012,8.032218 1.707706,5.67034 1.289218,11.935815 -1.298281,17.283334 -0.848852,1.754274 -1.894916,3.399473 -3.130377,4.906842 -0.35348,0.431302 -0.720087,0.85354 -1.112009,1.25015 -0.103763,0.105326 -0.400049,0.343167 -0.399736,0.500061 0,0.145017 0.243779,0.31285 0.337228,0.406299 l 1.062628,1.062628 4.219259,4.219258 c 0.651641,-0.459118 1.203582,-1.240774 1.72302,-1.843972 1.535185,-1.78334 2.825965,-3.746702 3.9436,-5.813201 C 66.278131,35.954754 64.861085,21.94072 57.130779,12.122506 55.265866,9.7540934 53.05685,7.6690921 50.605305,5.9163497 42.778112,0.32060032 32.600948,-1.4058765 23.35202,1.1656959 20.072343,2.0775652 16.961781,3.5373442 14.132158,5.4237903 9.5077574,8.5066931 5.7922158,12.816306 3.3106355,17.779436 0.57255241,23.255596 -0.46179099,29.495347 0.18779386,35.56283 0.95400463,42.71963 4.2662507,49.571393 9.3503321,54.658881 Z"
      />
      <path
        style="fill: #000; stroke: #fff; stroke-width: 0.5"
        d="m 31.97806,11.997489 c -0.341604,1.476928 -0.924394,2.92754 -1.374354,4.375527 -0.744996,2.397289 -1.468333,4.806579 -2.261491,7.188366 -0.544847,1.636041 -1.041345,3.291397 -1.553094,4.938095 -0.506842,1.630978 -1.042313,3.18351 -0.635076,4.906843 0.16627,0.703522 0.464774,1.368602 0.865073,1.968987 2.099596,3.149442 6.764472,3.500422 9.364473,0.781344 1.259214,-1.316721 1.828345,-3.205386 1.586441,-5.000603 -0.153768,-1.139857 -0.61945,-2.250522 -0.959178,-3.344153 -1.047001,-3.368594 -2.104629,-6.734781 -3.178196,-10.094967 -0.437865,-1.371134 -0.898233,-2.742362 -1.296406,-4.125497 -0.105637,-0.367169 -0.238153,-0.72665 -0.343791,-1.093882 -0.04501,-0.1558 -0.08126,-0.399986 -0.214401,-0.50006 z"
      />
   </svg>
   <h1 align="center">Minimon</h1>
</div>

<div align="center">

[![License: AGPL-3.0](https://img.shields.io/github/license/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/blob/main/LICENSE)
[![Minimon Issues](https://img.shields.io/github/issues/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/issues)
[![Minimon Pull Requests](https://img.shields.io/github/issues-pr/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/pulls)
[![Minimon Commit Activity](https://img.shields.io/github/commit-activity/w/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/commits/main)
<br />
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Speed: Blazing](https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg)](https://twitter.com/acdlite/status/974390255393505280)

</div>

---

Minimon is a lightweight system monitoring application that allows you to monitor your system vitals in real time.

## Overview

### Minimon Core

General purpose package used for storing shared types and constants between the Minimon Server and the Minimon Client.

### Minimon Server

Backend system powered by Nest.js and the fantastic [systeminformation](https://github.com/sebhildebrandt/systeminformation) package that monitors your system vitals and exposes them via a REST API.

### Minimon Client

Frontend React application that updates in real time and displays your system vitals on a simple dashboard.

## Requirements

- [Node.js >= 16.0.0](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Installation

Minimon is still a work in progress so much works remains on simplifying the installation process. Currently, the only way to run the application is to run it in dev mode. In the future, I hope to compile everything to a single binary that can be easily downloaded and ran, but for now, the steps below will get you started.

1. Clone the repo
   - `git clone https://github.com/KasimAhmic/minimon.git`
2. Install dependencies
   - `yarn run init`
3. Start Minimon
   - `yarn start`
4. Navigate to Minimon
   - `http://localhost:3000` on the host machine
   - `http://YOUR_HOST_MACHINE'S_LOCAL_IP:3000` on another device
