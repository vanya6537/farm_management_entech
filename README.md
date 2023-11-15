# Farm Management Entech Django + React Apps

## Overview

The Farm Backend Django App is a web application designed to manage animal records on a farm. This Django app provides a set of functionalities to list animals, add new animals, remove animals, and retrieve the CSRF token for secure form submissions.

[farm_backend](./farm_backend/README.md)

The Farm Frontend React App is a web application designed to interact with the Farm Backend Django App. This React app provides a set of functionalities to display the list of animals, add new animals, remove animals, and retrieve the CSRF token for secure form submissions.

To learn more about the Farm Frontend React App, please visit the [farm_frontend](./farm_frontend/README.md) repository.


## Additional task solved in matrix.py:

[matrix.py with tests included](./matrix.py)
[random matrix generator (may help for tests 100x100)](./randomize_matrix.py)

```
Create a Python script
Create a Python script that accepts a matrix of values 0 and 1. The application should output
only one value into the console – number of areas formed of number 1.
The matrix is presented as a string value where ‘,’ is used as a separator for columns, ‘;’ is used as
a separator for rows. For instance, “1,0,1;0,1,0” string value should be converted to the matrix
[[1,0,1], [0,1,0]].
The maximum size of the matrix is 100x100.
Examples of the input and output:
1. Input: “1,0,1;0,1,0”
Output: 3
2. Input: “1,0,1;1,1,0”
Output: 2
3. Input: “1,1,1,0;0,1,0,0”
Output: 1
```