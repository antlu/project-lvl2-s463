# Configuration files comparer

[![Maintainability](https://api.codeclimate.com/v1/badges/c9b0ba9faa0dc8a3ab66/maintainability)](https://codeclimate.com/github/antlu/project-lvl2-s463/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c9b0ba9faa0dc8a3ab66/test_coverage)](https://codeclimate.com/github/antlu/project-lvl2-s463/test_coverage)
[![Build Status](https://github.com/antlu/project-lvl2-s463/workflows/CI/badge.svg)](https://github.com/antlu/project-lvl2-s463/actions)

A tool for showing the difference between configuration files.

Supported formats: JSON, YAML, INI.

---

## Installation
```
make install
make publish
npm link
```
[Demo](https://asciinema.org/a/sAoZXdXLGGtChNMTHwOlcNpsP)

## Usage
```
gendiff --help
```
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows the difference.

Options:
  -f, --format [type]  set output format (default: "tree")
  -V, --version        output the version number
  -h, --help           output usage information
```

### Plain files comparison
```
gendiff before.json after.json
```
```diff
{
    organization: Acme Widgets Inc.
  - name: John Doe
  + name: Anthony Lu
  - server: 192.0.2.62
  + server: 192.168.0.3
  - port: 143
  + port: 8080
  - file: payroll.dat
  + path: /secret
}

```
[Demo](https://asciinema.org/a/zmYFMDxgwWEbxwBqT4EuZXoxJ)

### Comparison of files with nested structure
```
gendiff before.yaml after.yml
```
```diff
{
    widget: {
      - debug: on
      + debug: off
        window: {
            name: main_window
            width: 500
            height: 500
          - title: Sample Konfabulator Widget
          + title: Sample Widget
          + position: center
        }
        image: {
            name: sun1
            vOffset: 250
          - src: Images/Sun.png
          + src: Images/Moon.png
          - hOffset: 250
          + hOffset: 200
          - alignment: center
          + border: {
                style: dashed
                width: 1px
            }
        }
      - text: {
            data: Click Here
            size: 36
            style: bold
            name: text1
            hOffset: 250
            vOffset: 100
            alignment: center
            onMouseUp: sun1.opacity = (sun1.opacity / 100) * 90;
        }
      + author: person
    }
}
```
[Demo](https://asciinema.org/a/BJQU3Upk9uKpvEThpKfMzXC2x)

### Setting output in different formats
Supported formats:
- tree (default)
- text
- json
```
gendiff before.ini after.ini --format=text
```
```
Property 'common.setting3' was changed from true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.setting2' was removed
Property 'common.follow' was added with value: false
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest.key.key' was changed from 'value' to 'value1'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
[Demo](https://asciinema.org/a/EfHRpUJ5iQW9tDZ0P4aToSpnd)
