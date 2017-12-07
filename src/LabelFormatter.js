function formatNodeLabel(node) {
    let title = `<b>${node.title}</b>`;
    let descriptionParts = [];
    if(node.description) {
        descriptionParts = node.description.split('\n').map((line) => {
            return `<i>${line}</i>`;
        });
    }

    return [title, ...descriptionParts].join('\n');
}

export default ({
    formatNodeLabel: formatNodeLabel
});