import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import { KobanaConfig } from './config.js';
import { ComponentDef } from './registry.js';

/**
 * Detect the package manager used in the project.
 */
export function detectPackageManager(projectDir: string = process.cwd()): 'npm' | 'pnpm' | 'yarn' | 'bun' {
  if (fs.existsSync(path.join(projectDir, 'bun.lockb')) || fs.existsSync(path.join(projectDir, 'bun.lock'))) {
    return 'bun';
  }
  if (fs.existsSync(path.join(projectDir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(projectDir, 'yarn.lock'))) {
    return 'yarn';
  }
  return 'npm';
}

/**
 * Rewrite import paths in component source code to match the consumer project's aliases.
 */
export function rewriteImports(
  content: string,
  config: KobanaConfig,
): string {
  let result = content;

  // Rewrite kobana composite imports:
  // from '@/components/kobana/composites/...' to the project's alias
  result = result.replace(
    /@\/components\/kobana\//g,
    `${config.alias}/`,
  );

  // Rewrite shadcn imports:
  // from '@/components/ui/...' to the project's shadcn alias
  result = result.replace(
    /@\/components\/ui\//g,
    `${config.shadcnAlias}/`,
  );

  return result;
}

/**
 * Copy a kobana component's files to the consumer project.
 */
export async function installComponent(
  component: ComponentDef,
  slug: string,
  config: KobanaConfig,
  sourceDir: string,
  projectDir: string = process.cwd(),
): Promise<void> {
  for (const file of component.files) {
    const sourcePath = path.join(sourceDir, file);

    // Map source path to destination path
    // e.g., src/components/composites/status-badge/index.ts → {componentDir}/composites/status-badge/index.ts
    const relativePath = file.replace(/^src\/components\//, '');
    const destPath = path.join(projectDir, config.componentDir, relativePath);

    // Don't overwrite existing files
    if (await fs.pathExists(destPath)) {
      continue;
    }

    // Read source, rewrite imports, write to dest
    const content = await fs.readFile(sourcePath, 'utf-8');
    const rewritten = rewriteImports(content, config);

    await fs.ensureDir(path.dirname(destPath));
    await fs.writeFile(destPath, rewritten, 'utf-8');
  }
}

/**
 * Install shadcn dependencies via npx shadcn@latest add.
 */
export async function installShadcnDeps(
  deps: string[],
  projectDir: string = process.cwd(),
): Promise<void> {
  if (deps.length === 0) return;

  await execa('npx', ['shadcn@latest', 'add', ...deps, '--yes'], {
    cwd: projectDir,
    stdio: 'pipe',
  });
}

/**
 * Install npm package dependencies.
 */
export async function installNpmDeps(
  deps: string[],
  projectDir: string = process.cwd(),
): Promise<void> {
  if (deps.length === 0) return;

  const pm = detectPackageManager(projectDir);
  const installCmd = pm === 'yarn' ? 'add' : 'install';

  await execa(pm, [installCmd, ...deps], {
    cwd: projectDir,
    stdio: 'pipe',
  });
}
