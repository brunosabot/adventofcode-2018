# Installation

## Requirements

You will need typescript installed on your device

```sh
npm i -g typescript
```

## Install dependencies

The dependencies are installed using yarn

```sh
yarn
```

# Usage

## Create files for a new day

The create script allow you to create the required files to start a new day resolution.
You just need to use the create script with the day (1 to 24) you need as last parameter

```sh
yarn run create [day]
```

It will create a new folder in the src folder with the following files :

```
src
  - day[day]
    - lib.ts              # Common library to resolve the current day
    - lib.spec.ts         # Test file for the library
    - part1.ts            # The main file for the first part of today puzzle
    - part1.spec.ts       # The test file for the first part of today puzzle
    - part2.ts            # The main file for the second part of today puzzle
    - part2.spec.ts       # The test file for the second part of today puzzle
```

Additionnally, it will add two input files in the inputs folder :

```
inputs
  - [day]-1.txt           # The input data for the first puzzle of day [day]
  - [day]-2.txt           # The input data for the second puzzle of day [day]
```

Note : if your try to relaunch the creation script on a day already existing, it will ignore the creation and keep your current files

## Launch today script

You can launch today both puzzle or individually depending on your needs

```sh
yarn run start [day]      # Will run both puzzle in a row
yarn run start:1 [day]    # Will run only puzzle 1
yarn run start:2 [day]    # Will run only puzzle 2
```

## Launch tests

There are two modes for the tests : normal or watch.
It will run tests on all your sources files.

```sh
yarn run test             # Will run tests and will quit
yarn run test:watch       # Will run tests in watch mode
```

## Build typescript sources

Like we did in the tests, two modes are supported to build typescript sources : normal or watch.
It will build all your source files.

```sh
yarn build build          # Will build sources and will quit
yarn build build:watch    # Will build sources in watch mode
```
