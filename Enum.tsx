export enum Unit{
    AREA = 'area',
    LENGTH = 'length',
}
export const getUnitComponent = (unit?: Unit) =>
{
    if (!unit) return null;
    switch (unit) {
        case Unit.AREA:
            return <span>m<sup>2</sup></span>
        case Unit.LENGTH:
            return <span>m</span>
        case null:

        default:
            return null
    }
}