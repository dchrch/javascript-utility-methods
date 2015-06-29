var arr1 = [[1, 2], [3, [4, 5]], 6];

// Iterative

Array.prototype.flatten = function(shallow) {
    if (shallow)
        return this.reduce(function(a, b) { return a.concat(b) });
    var arrMap = [{loc: this, index: 0}];
    var res = [];
    while (arrMap.length > 0) {
        var curr = arrMap[0];
        for (i = curr.index; i < curr.loc.length; i++) {
            var item = curr.loc[i];
            if (!Array.isArray(item))
                res.push(item);
            else {
                curr.index = i + 1;
                arrMap.unshift({loc: item});
                curr = arrMap[0];
                i = -1;
            }
        }
        arrMap.shift();
    }
    return res;
};

arr1.flatten(); // [ 1, 2, 3, 4, 5, 6 ]
arr1.flatten(true); // [ 1, 2, 3, [ 4, 5 ], 6 ]

// Recursive

Array.prototype.flattenR = function(shallow) {
    if (shallow === true)
        return this.reduce(function(a, b) { return a.concat(b) });
    shallow = shallow || [];
    this.forEach(function(i) {
        Array.isArray(i) ? i.flattenR(shallow) : shallow.push(i);
    });
    return shallow;
};

arr1.flattenR(); // [ 1, 2, 3, 4, 5, 6 ]
arr1.flattenR(true); // [ 1, 2, 3, [ 4, 5 ], 6 ]
