<div align="center">
   <img src="./assets/minimon.png" width="256px" height="256px" />
   <h1 align="center">Minimon</h1>
</div>

<div align="center">

[![License: AGPL-3.0](https://img.shields.io/github/license/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/blob/main/LICENSE)
[![Code Size](https://img.shields.io/github/languages/code-size/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon)
[![Downloads](https://img.shields.io/github/downloads/KasimAhmic/minimon/total)](https://github.com/KasimAhmic/minimon/releases)
[![Test Coverage](https://codecov.io/gh/KasimAhmic/minimon/branch/main/graph/badge.svg?token=Q0Q8CHOW4H)](https://codecov.io/gh/KasimAhmic/minimon)
<br />
[![Minimon Open Issues](https://img.shields.io/github/issues-raw/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/issues)
[![Minimon Closed Issues](https://img.shields.io/github/issues-closed-raw/KasimAhmic/minimon)](https://github.com/KasimAhmic/minimon/issues?q=is%3Aclosed)
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

Backend system powered by [Nest.js](https://github.com/nestjs/nest) and the fantastic [systeminformation](https://github.com/sebhildebrandt/systeminformation) package that monitors your system vitals and exposes them via a REST API.

### Minimon Client

Frontend React application that updates in real time and displays your system vitals on a simple dashboard.

## Requirements

- [Node.js >= 16.0.0](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)

## Installation

Minimon is still a work in progress so much work remains on simplifying the installation process. Currently, the only way to run the application is to run it in dev mode. In the future, I hope to compile everything to a single binary that can be easily downloaded and ran, but for now, the steps below will get you started.

1. Clone the repo
   - `git clone https://github.com/KasimAhmic/minimon.git`
2. Install dependencies
   - `yarn run init`
3. Start Minimon
   - `yarn start`
4. Navigate to Minimon
   - `http://localhost:3000` on the host machine
   - `http://YOUR_HOST_MACHINE'S_LOCAL_IP:3000` on another device
