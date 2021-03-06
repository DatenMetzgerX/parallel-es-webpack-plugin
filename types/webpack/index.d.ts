// tslint:disable:interface-name no-empty-interface max-classes-per-file
declare module "webpack" {
    import {RawSourceMap} from "source-map";

    export interface Tapable {
        apply(...toApply: Array<{ apply: (tapable: Tapable) => void }>): void;
    }

    export interface FileSystem {
        exists(path: string, callback: (error: any, exists: boolean) => void): void;

        existsSync(path: string): boolean;

        readFile(path: string, callback?: (error: any, content: string) => void): void;

        readFile(path: string, encoding?: string, callback?: (error: any, content: string) => void): void;

        readFileSync(path: string, encoding?: string): string;
    }

    export class LoaderOptionsPlugin {
        constructor(options: { debug?: boolean });
    }

    export interface Compiler extends Tapable {
        context: string;
        inputFileSystem: FileSystem;
        outputFileSystem: FileSystem;

        /**
         * A Compilation is created. A plugin can use this to obtain a reference to the Compilation object. The params object contains useful references.
         */
        plugin(name: "compilation", callback: (c: Compilation, params: any) => void): void;

        plugin(name: "compile", callback: (params: any) => void): void;

        /**
         * A NormalModuleFactory is created. A plugin can use this to obtain a reference to the NormalModuleFactory object.
         */
        plugin(name: "normal-module-factory", callback: (factory: NormalModuleFactory) => void): void;

        /**
         * A ContextModuleFactory is created. A plugin can use this to obtain a reference to the ContextModuleFactory object.
         */
        plugin(name: "context-module-factory", callback: (factory: ContextModuleFactory) => void): void;

        /**
         * The Compiler starts compiling. This is used in normal and watch mode. Plugins can use this point to modify the params object (i. e. to decorate the factories).
         */
        plugin(name: "compile", callback: (params: any) => void): void;

        /**
         * Plugins can use this point to add entries to the compilation or prefetch modules. They can do this by calling addEntry(context, entry, name, callback) or prefetch(context, dependency, callback) on the Compilatio
         */
        plugin(name: "make", callback: (c: Compilation, callback: (error: any) => void) => void): void;

        plugin(name: "after-compile", callback: (this: void, c: Compilation, callback: (error: any) => void) => void): void;

        plugin(name: "emit", callback: (c: Compilation, callback: (error: any) => void) => void): void;

        plugin(name: "done", callback: (this: void) => void): void;

        isChild(): boolean;

        runAsChild(callback: (error: any, entries: any[], compilation: Compilation) => void): void;
    }

    interface Asset {
        emitted: boolean;
        existsAt: string;

        map(): RawSourceMap;

        source(): string;
    }

    export interface Compilation extends Tapable {
        cache: { [name: string]: {} };
        compiler: Compiler;
        errors: Error[];
        assets: { [name: string]: Asset };
        modules: Module[];

        addEntry(context: any, entry: any, name: string, callback: Function): void;

        createChildCompiler(name: string, outputOptions: WebpackOptions): Compiler;

        plugin(event: "succeed-module", callback: (this: void, module: Module) => void): void;

        plugin(event: "failed-module", callback: (this: void, module: Module) => void): void;

        plugin(evnet: "need-additional-pass", callback: (this: void) => boolean): void;
    }

    export interface Module {
        fileDependencies: string[];
        resource: string;
        rawRequest: string;
        request: string;
    }

    export interface NormalModuleFactory {
    }

    export interface ContextModuleFactory {
    }

    export interface WebpackOptions {
        debug?: boolean;
        devtool?: string;
        filename?: string;
    }

    export interface Loader {
        resourcePath: string;

        async(): (error: any, code?: string, map?: RawSourceMap) => void;
    }

    export interface Stats {
        compilation: Compilation;
    }
}

declare module "webpack/lib/SingleEntryPlugin" {
    import {Tapable} from "webpack";

    class SingleEntryPlugin implements Tapable {
        constructor(context: string, request: string, entryName: string);

        public apply(...toApply: { apply: ((tapable: Tapable) => void) }[]): void;
    }

    export = SingleEntryPlugin;
}

declare module "webpack/lib/webworker/WebWorkerTemplatePlugin" {
    import {Tapable} from "webpack";

    class WebWorkerTemplatePlugin implements Tapable {
        constructor(outputOptions: any);

        public apply(...toApply: Array<{ apply: ((tapable: Tapable) => void) }>): void;
    }

    export = WebWorkerTemplatePlugin;
}
