# json-sort
This atom plugin allows you sort JSON in the text editor. Additionally, this will format the JSON to be indented with 4 spaces.


## How to use json-sort
1. Highlight the JSON you want to sort
2. Press Control + Alt/Option + O or Command + Shift + P and search for JSON Sort

## Example of json-sort
Starting code:
```json
{
"some": "string",
"another": true,
"here": 123
}
```

Output of json-sort:
```json
{
    "another": true,
    "here": 123,
    "some": "string"
}
```

Also works for nested JSON:
```json
{
"test": {
"zzz": "asdf",
"aaa": "asdf"
},
"a": {
"x": "asdf",
"a": "asdf",
"v": "asdf"
}
}
```

Result of nested JSON:
```json
{
    "a": {
        "a": "asdf",
        "v": "asdf",
        "x": "asdf"
    },
    "test": {
        "aaa": "asdf",
        "zzz": "asdf"
    }
}
```
