/* tslint:disable */

declare module "redux-stack" {

    interface ReduxStack {
        reducers?: any;
        enhancers?: any[];
        composers?: any[];
    }

    export function buildStack(stack: ReduxStack[]): { reducers: any, enhancer: any } ;
}
