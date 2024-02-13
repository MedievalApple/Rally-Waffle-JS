
function getMaps() {
    return levels = [
        //Level 0
        {
            "map": [
                ["R", "G", "G", "W", "W", "G", "W", "W", "W", "W", "R", "R", "R", "R", "R", "G"],
                ["R", "R", "R", "R", "R", "R", "R", "G", "W", "G", "R", "W", "W", "G", "R", "R"],
                ["R", "W", "W", "R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "G", "R"],
                ["R", "W", "W", "R", "W", "W", "W", "R", "W", "W", "G", "G", "W", "G", "W", "R"],
                ["R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "W", "G", "G", "G", "G", "R"],
                ["R", "W", "R", "R", "G", "G", "G", "R", "R", "R", "R", "G", "W", "W", "W", "R"],
                ["R", "R", "R", "G", "G", "W", "G", "G", "G", "W", "R", "R", "R", "R", "R", "R"],
                ["R", "G", "R", "W", "G", "G", "G", "G", "G", "W", "R", "G", "W", "W", "G", "R"],
                ["R", "W", "R", "R", "R", "R", "R", "W", "G", "R", "R", "G", "G", "W", "R", "R"],
                ["R", "G", "R", "G", "W", "G", "R", "G", "W", "G", "R", "R", "R", "R", "R", "G"],
                ["R", "R", "R", "R", "R", "R", "R", "R", "G", "G", "R", "G", "R", "G", "R", "W"],
                ["R", "W", "W", "R", "W", "G", "G", "R", "R", "R", "R", "G", "R", "R", "R", "R"],
                ["R", "W", "W", "R", "W", "W", "W", "R", "G", "G", "W", "G", "R", "G", "G", "R"],
                ["R", "W", "R", "R", "R", "R", "R", "R", "G", "W", "W", "G", "R", "W", "W", "R"],
                ["R", "W", "R", "G", "G", "W", "G", "R", "R", "G", "W", "G", "R", "G", "G", "R"],
                ["R", "R", "R", "W", "W", "W", "G", "W", "R", "R", "R", "R", "R", "R", "R", "R"]
            ],
            "maples": [
                createVector(3, 1),
                createVector(7, 2),
                createVector(15, 4),
                createVector(0, 5),
                createVector(15, 7),
                createVector(6, 8),
                createVector(10, 8),
                createVector(2, 9),
                createVector(9, 11),
                createVector(13, 11),
                createVector(4, 13),
                createVector(0, 15),
                createVector(2, 15)
            ],
            "enemies": 0,
            "start": createVector(0, 0),
            "direction": PI
        },

        //Level 1
        {
            "map": [
                ["W", "R", "R", "R", "R", "R", "G", "W", "G", "R", "R", "R", "R", "R", "G", "W"],
                ["R", "R", "G", "W", "G", "R", "R", "R", "R", "R", "W", "R", "G", "R", "R", "G"],
                ["R", "G", "G", "G", "W", "W", "W", "R", "G", "G", "W", "R", "W", "W", "R", "R"],
                ["R", "W", "W", "G", "W", "W", "W", "R", "G", "W", "W", "R", "W", "W", "W", "R"],
                ["R", "W", "W", "G", "R", "R", "R", "R", "W", "W", "W", "R", "R", "R", "R", "R"],
                ["R", "R", "W", "R", "R", "W", "W", "R", "G", "W", "W", "R", "G", "W", "W", "R"],
                ["G", "R", "R", "R", "G", "W", "W", "R", "G", "G", "G", "R", "W", "W", "W", "R"],
                ["W", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "R", "G", "R", "R", "R"],
                ["W", "R", "R", "R", "G", "R", "W", "W", "W", "G", "R", "R", "R", "R", "W", "G"],
                ["R", "R", "G", "R", "W", "R", "R", "R", "R", "R", "R", "W", "G", "R", "R", "R"],
                ["R", "G", "G", "R", "G", "W", "W", "R", "G", "W", "R", "W", "W", "W", "W", "R"],
                ["R", "W", "W", "R", "R", "W", "G", "R", "R", "G", "R", "G", "W", "W", "W", "R"],
                ["R", "W", "W", "G", "R", "R", "R", "W", "R", "W", "R", "R", "R", "R", "R", "R"],
                ["R", "G", "W", "W", "R", "W", "R", "R", "R", "R", "R", "G", "R", "W", "W", "R"],
                ["R", "R", "R", "W", "R", "W", "W", "R", "G", "R", "R", "R", "R", "W", "R", "R"],
                ["W", "G", "R", "R", "R", "G", "G", "R", "W", "W", "W", "G", "R", "R", "R", "G"]
            ],
            "maples": [
                createVector(0, 11),
                createVector(1, 9),
                createVector(2, 14),
                createVector(3, 0),
                createVector(7, 3),
                createVector(8, 11),
                createVector(11, 8),
                createVector(12, 0),
                createVector(14, 7),
                createVector(14, 14),
                createVector(15, 3)
            ],
            "enemies": 2,
            "start": createVector(7, 7),
            "direction": 0
        },

        //level 2
        {
            "map": [
            ["R", "G", "G", "W", "W", "G", "W", "W", "W", "W", "R", "R", "R", "R", "R", "G"],
            ["R", "R", "R", "R", "R", "R", "R", "G", "W", "G", "R", "W", "W", "G", "R", "R"],
            ["R", "W", "W", "R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "G", "G", "R"],
            ["R", "W", "W", "R", "W", "W", "W", "R", "W", "W", "G", "G", "W", "G", "W", "R"],
            ["R", "W", "W", "R", "R", "R", "R", "R", "W", "W", "W", "G", "G", "G", "G", "R"],
            ["R", "W", "R", "R", "G", "G", "G", "R", "R", "R", "R", "G", "W", "W", "W", "R"],
            ["R", "R", "R", "G", "G", "W", "G", "G", "G", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "R", "W", "G", "G", "G", "G", "G", "W", "R", "G", "W", "W", "G", "R"],
            ["R", "W", "R", "R", "R", "R", "W", "W", "W", "G", "R", "R", "R", "R", "W", "G"],
            ["R", "W", "G", "R", "W", "R", "R", "R", "R", "R", "R", "W", "G", "R", "R", "R"],
            ["R", "G", "G", "R", "G", "W", "W", "R", "G", "W", "R", "W", "W", "W", "W", "R"],
            ["R", "W", "W", "R", "R", "W", "G", "R", "R", "G", "R", "G", "W", "W", "W", "R"],
            ["R", "W", "W", "G", "R", "R", "R", "W", "R", "W", "R", "R", "R", "R", "R", "R"],
            ["R", "G", "W", "W", "R", "W", "R", "R", "R", "R", "R", "G", "R", "W", "W", "R"],
            ["R", "R", "R", "W", "R", "W", "W", "R", "G", "R", "R", "R", "R", "W", "R", "R"],
            ["W", "G", "R", "R", "R", "G", "G", "R", "W", "W", "W", "G", "R", "R", "R", "G"]
        ],
        "maples": [
            createVector(3, 1),
            createVector(7, 2),
            createVector(15, 4),
            createVector(0, 5),
            createVector(15, 7),
            createVector(11, 8),
            createVector(8, 11),
            createVector(0, 12),
            createVector(7, 14),
            createVector(14, 14),
            createVector(3, 15),
        ],
        "enemies": 4,
        "start": createVector(0, 0),
        "direction": PI
        },

        //level 3
        {
            "map": [
                ["W", "R", "R", "R", "R", "R", "G", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
                ["W", "R", "W", "G", "W", "R", "R", "R", "W", "R", "W", "W", "W", "R", "W", "R"],
                ["W", "R", "R", "R", "W", "R", "W", "R", "W", "R", "R", "R", "R", "R", "W", "R"],
                ["W", "R", "W", "W", "W", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R"],
                ["W", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R"],
                ["W", "G", "W", "R", "W", "W", "W", "R", "W", "R", "W", "W", "W", "W", "W", "R"],
                ["W", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R", "R", "R", "W", "R"],
                ["W", "R", "W", "R", "W", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R"],
                ["W", "R", "W", "R", "R", "R", "R", "R", "R", "R", "R", "R", "W", "R", "R", "R"],
                ["W", "R", "W", "W", "W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "W", "W"],
                ["G", "R", "R", "R", "R", "R", "W", "R", "R", "R", "R", "R", "R", "R", "R", "R"],
                ["G", "R", "W", "R", "W", "W", "W", "R", "W", "R", "W", "R", "G", "W", "G", "R"],
                ["G", "R", "W", "R", "W", "R", "R", "R", "W", "R", "R", "R", "W", "W", "W", "R"],
                ["W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "W", "R", "G", "W", "G", "R"],
                ["W", "R", "R", "R", "R", "R", "W", "R", "R", "R", "W", "R", "R", "R", "R", "R"],
                ["W", "W", "W", "W", "W", "G", "G", "G", "W", "G", "G", "G", "W", "W", "W", "W"]
            ],
            "maples": [
                createVector(7, 0),
                createVector(11, 0),
                createVector(3, 2),
                createVector(9, 2),
                createVector(7, 4),
                createVector(15, 4),
                createVector(3, 6),
                createVector(9, 6),
                createVector(15, 8),
                createVector(5, 10),
                createVector(9, 10),
                createVector(1, 12),
                createVector(7, 14),
                createVector(11, 14),
                createVector(15, 14)
            ],
            "enemies": 5,
            "start": createVector(1, 0),
            "direction": PI
        },
    ]
}