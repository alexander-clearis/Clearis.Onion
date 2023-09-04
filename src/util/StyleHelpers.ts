export namespace StyleHelpers {

    export type ClassName = {
        [index: string]: boolean;
    } | string | string[]

    export function parseClassName(classNames: ClassName): string {
        if (typeof classNames == "object") {
            if (classNames instanceof Array) {
                return parseClassName_fromArray(classNames)
            } else {
                return parseClassName_fromObject(classNames)
            }
        } else if (typeof classNames == "string") {
            return classNames
        }
        return ""
    }

    export function parseClassName_fromArray(stringArray: string[]): string | undefined {

        return stringArray.join(' ');
    }

    export function parseClassName_fromObject(classNameObject: ClassName): string {
        let activeClassNames: string[] = []

        Object.keys(classNameObject).forEach(className => {
            if (!!classNameObject[className]) {
                activeClassNames.push(className)
            }
        });
        return activeClassNames.join(' ');
    }
}