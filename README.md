# Temperature Unit Transform

A JavaScript module transforms Celsius to Fahrenheit or opposites them.

## Usage

~~~ typescript
import { createUnitTransform } from 'unit-transform'

const units = createUnitTransform({ scale: 0, unit: 'c' })
units.c2f(10) // 10C -> 50 F
~~~
