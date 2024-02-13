function knightMoves(start, end) {
    let moves = [[1, 2], [2, 1], [1, -2], [2, -1], [-1, 2], [-2, 1], [-1, -2], [-2, -1]];
    let vector;
    let position = start;
    let path = [start];
    let graph = [];
    let distances = [];

    if (start.some(x => x > 7 || x < 0) || end.some(x => x > 7 || x < 0)) {
        console.log("Enter valid coordinates");
        return;
    }

    if (distance(start, end) === 0) {
        console.log(`You are already at your destination. That took 0 moves!`);
        return;
    }
    
    // If the knight's distance from the target is a multiple of sqrt(5), then find which possible
    // vector brings the knight closest to the target. Move according to this vector until
    // the destination is reached.
    else if (distance(start, end) % Math.sqrt(5) === 0) {
        for (let move of moves) {
            let arr = [position[0] + move[0], position[1] + move[1]];
            if (arr.every(x => x >= 0)) graph.push(arr);
        }

        for (let vertex of graph) distances.push(distance(vertex, end));
        position = graph[distances.indexOf(Math.min(...distances))];
        vector = [position[0] - start[0], position[1] - start[1]];
        path.push(position);

        while (position[0] !== end[0] && position[1] !== end[1]) {
            position = [position[0] + vector[0], position[1] + vector[1]];
            path.push(position);
        }

        console.log(`You made it in ${path.length - 1} moves. Here's your path:`)
        for (let coordinates of path) console.log(coordinates);
        return;
    }

    // For any other case, the goal is to make one of 2 possible moves: Either move the piece
    // into a position X * sqrt(5) units away from the target, or such that it moves as close
    // to the target as possible. Repeat until the destination is reached.
    else {
        let found = false;
        while (!found) {
            for (let move of moves) {
                let arr = [position[0] + move[0], position[1] + move[1]];
                if (arr.every(x => x >= 0)) graph.push(arr);
            }
            for (let vertex of graph) distances.push(distance(vertex, end));

            // As before, fill the graph with all possible moves from the current position. If
            // one of those moves takes the knight X * sqrt(5) away from the target, switch
            // to that vertex. Otherwise, choose the move which takes the Knight closest.
            for (let i = 0; i < distances.length; i++) {
                if (distances[i] % Math.sqrt(5) === 0) {
                    position = graph[i];
                    path.push(position);
                    found = true;
                    break;
                }
            }
            if (!found) {
                position = graph[distances.indexOf(Math.min(...distances))];
                path.push(position);
            }
            graph = [];
            distances = [];
        }

        for (let move of moves) {
            let arr = [position[0] + move[0], position[1] + move[1]];
            if (arr.every(x => x >= 0)) graph.push(arr);
        }

        for (let vertex of graph) distances.push(distance(vertex, end));
        let temp = position;
        position = graph[distances.indexOf(Math.min(...distances))];
        vector = [position[0] - temp[0], position[1] - temp[1]];
        path.push(position);

        while (position[0] !== end[0] && position[1] !== end[1]) {
            position = [position[0] + vector[0], position[1] + vector[1]];
            path.push(position);
        }

        console.log(`You made it in ${path.length - 1} moves. Here's your path:`);
        for (let coordinates of path) console.log(coordinates);
        return;
    }
}
// This calculates the shortest distance between two points on the board using Pythagoras' theorem
function distance(start, end) {
    return Math.sqrt((end[0] - start[0]) ** 2 + (end[1] - start[1]) ** 2);
}