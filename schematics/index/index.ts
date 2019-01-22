import { strings } from '@angular-devkit/core';
import {
	Rule,
	SchematicContext,
	Tree,
	apply,
	url,
	template,
	move,
	chain,
	branchAndMerge,
	mergeWith } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { parseName } from '@schematics/angular/utility/parse-name';
import { IIndexOptions } from './schema';

export default function example(options: IIndexOptions): Rule {
	return (tree: Tree, _context: SchematicContext) => {
		const workspace = getWorkspace(tree);
		if (!options.project) {
			options.project = Object.keys(workspace.projects)[0];
		}
		const project = workspace.projects[options.project];

		if (options.path === undefined) {
			const projectDirName = project.projectType === 'application' ? 'app' : 'lib';
			options.path = `/${project.root}/src/${projectDirName}`;
		}


		const parsedPath = parseName(options.path, options.name);
		options.name = parsedPath.name;
		options.path = `${parsedPath.path}/${parsedPath.name}`;

		const templateSource = apply(url('./files'), [
			template({
				...strings,
				...options
			}),
			move(options.path)
		]);
		const rule = chain([
			branchAndMerge(chain([
				mergeWith(templateSource),
			]))
		]);
		return rule(tree, _context);
	};
}
