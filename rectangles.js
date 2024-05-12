
const LINE_X_LEFT=65;
const LINE_X_RIGHT=557;
const LINE_HEIGHT=54;
const OFFSET_Y=27;

function get4points(a, b) {
    let yA=getYOfPosition(a);
    let yB=getYOfPosition(b);
    var p1 = [a[0], yA - OFFSET_Y];
    var p2 = [b[0], yB - OFFSET_Y];
    var p3 = [a[0], yA + OFFSET_Y];
    var p4 = [b[0], yB + OFFSET_Y];
    return [p1, p2, p4, p3];
}
function getYOfPosition(position){
    let line=getLineNumberFromPosition(position);
    return getYOfLine(line);
}
function getYOfLine(line){
    return LINE_HEIGHT * (line + 0.5);
}
function getLeftPointOfLine(line) {
    var yLine = getYOfLine(line);
    return [LINE_X_LEFT, yLine];
}
function getRightPointOfLine(line) {
    var yLine = getYOfLine(line);
    return [LINE_X_RIGHT, yLine];
}
function getLineNumberFromPosition(position){
    return Math.floor(position[1] / LINE_HEIGHT);
}
function getRectangles(ayaPosition, previousAyaPosition) {
    var lineA = getLineNumberFromPosition(ayaPosition);
    var lineB = getLineNumberFromPosition(previousAyaPosition);

    let rectangles = [];

    if (lineA === lineB) {
        rectangles.push(get4points(ayaPosition, previousAyaPosition));
    } else {
        // First line
        let leftPointOfLine = getLeftPointOfLine(lineB);
        rectangles.push(get4points(leftPointOfLine, previousAyaPosition));
        lineB++;

        // Middle lines
        while (lineB < lineA) {
            leftPointOfLine = getLeftPointOfLine(lineB);
            var rightPointOfLine = getRightPointOfLine(lineB);
            rectangles.push(get4points(leftPointOfLine, rightPointOfLine));
            lineB++;
        }

        // Last line
        var rightPointOfLine = getRightPointOfLine(lineB);
        rectangles.push(get4points(ayaPosition, rightPointOfLine));
    }
    return rectangles;
}
