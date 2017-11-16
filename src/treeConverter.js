function printTree(tree) {
    return convertNodeToString(tree);
}

function convertNodeToString(treeNode, childIndentLevel = 1) {
    var output = "";
    output += treeNode.name;
    if (treeNode.KPI && treeNode.KPI.length !== 0) {
        output += ': ';
        output += treeNode.KPI.join(", ");
    }
    for (let child of treeNode.children) {
        output += '\n';
        for(let i = 0; i<childIndentLevel; i++) {
            output += '\t';
        }
        output += convertNodeToString(child, childIndentLevel+1);
    }
    return output;
}

module.exports = {
    toString: printTree
}