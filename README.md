# generate-robots-text

Generate Robots.txt file with your custom configs

## Installation

## Usage

1. After installation first create the main config file by running the following command

```


generate-robot -c

or

generate-robot --config
```

2. then edit the config file 

### robot-txt.config.js
```
module.exports = {
    destinationPath : "",
    policy:
        {
            userAgent: "",
            disallow: [],
            allow: []
        },
};

```

### example

```

module.exports = {
    destinationPath : "/public",
    policy:
        {
            userAgent: "*",
            disallow: ["testDisallow", "/enterprise/orgs-terms"],
            allow: ["/browse/", "/contact/"]
        },
};

```

3. run following commond to generate the robots.txt file

```
generate-robot -r

or

generate-robot --robot

```

## All set
