It is possible for a knight to reach any point on a chess board no matter the starting point, given enough moves. The possible vectors a knight can travel along in one move are: [1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-1, -2] and [-2, -1]. Depending on where the knight is, some of these won't be legal since they would take the piece off the board. The task is to find the shortest possible path and print the coordinates at each step.

There are two easy cases. The first is if the knight is already in the right place. The second is if the user requests an invalid position.

Otherwise there are two possibilities. For both, the first step is to calculate the distance between the knight's starting position and the target. Distance is calculated using a separate function which applies Pythagoras' theorem.

Since each move/vector has a magnitude of sqrt(5) units, if the distance is a multiple of sqrt(5) from the target (a straight line), then all we need must do is find which of the 8 vectors points directly at the target. Some multiple of that vector will be the shortest path by definition. For example: moving from [0, 0] to [6, 3] requires 3 iterations of the vector [2, 1]. 

If the knight is not a multiple of sqrt(5) away from the target, then the vector that takes it closest to the target is chosen. At each step the same decision is made - if a potential move takes the knight some distance X * sqrt(5) away from the destination then that is chosen. At that point we simply apply the previous step's logic and see which vector points directly at the target. If not, we keep moving closer until we can move into such a position.

Sometimes there will be multiple possible paths with an equal number of steps. Going from [0, 0] to [3, 3] is possible via [1, 2] and [2, 1] in either order. The knightMoves() function will print out one possible route.