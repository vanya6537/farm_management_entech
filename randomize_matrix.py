import random

# Generate a random 100x100 matrix with 0s and 1s
matrix = [[random.choice([0, 1]) for _ in range(100)] for _ in range(100)]

# Convert the matrix to the desired string format
matrix_str = ';'.join(','.join(map(str, row)) for row in matrix)

# Print the formatted string
print(matrix_str)
