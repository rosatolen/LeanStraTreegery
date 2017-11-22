class LabelFormatter {
    createLabel = (header, subtext = '') => {
        let headerParts = header.split('\n');
        let subtextParts = subtext.split('\n');
        for(let i=0; i<headerParts.length; i++) {
            headerParts[i] = `<b>${headerParts[i]}</b>`
        }
        for(let i=0; i<subtextParts.length; i++) {
            subtextParts[i] = `<i>${subtextParts[i]}</i>`
        }
        return `${headerParts.join('\n')}\n${subtextParts.join('\n')}`
    }
}

export default new LabelFormatter();