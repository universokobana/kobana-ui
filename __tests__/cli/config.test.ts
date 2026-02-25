import { describe, it, expect } from 'vitest';
import { loadConfig, findConfigPath, saveConfig } from '../../src/cli/utils/config.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

describe('findConfigPath', () => {
  it('returns null when no kobana.json exists', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      expect(findConfigPath(tmpDir)).toBeNull();
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('finds kobana.json in current directory', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      const configPath = path.join(tmpDir, 'kobana.json');
      fs.writeJSONSync(configPath, { componentDir: 'src/components/kobana' });
      expect(findConfigPath(tmpDir)).toBe(configPath);
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('finds kobana.json by searching up directories', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      const subDir = path.join(tmpDir, 'src', 'components');
      fs.ensureDirSync(subDir);
      const configPath = path.join(tmpDir, 'kobana.json');
      fs.writeJSONSync(configPath, { componentDir: 'src/components/kobana' });
      expect(findConfigPath(subDir)).toBe(configPath);
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});

describe('loadConfig', () => {
  it('loads a valid kobana.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      fs.writeJSONSync(path.join(tmpDir, 'kobana.json'), {
        componentDir: 'src/components/kobana',
        typescript: true,
        alias: '@/components/kobana',
        shadcnAlias: '@/components/ui',
        registry: 'https://example.com/registry.json',
        installed: {},
      });
      const config = await loadConfig(tmpDir);
      expect(config.componentDir).toBe('src/components/kobana');
      expect(config.typescript).toBe(true);
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('throws on missing kobana.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      await expect(loadConfig(tmpDir)).rejects.toThrow('kobana.json not found');
    } finally {
      fs.removeSync(tmpDir);
    }
  });

  it('throws on invalid kobana.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      fs.writeFileSync(path.join(tmpDir, 'kobana.json'), '"not an object"');
      await expect(loadConfig(tmpDir)).rejects.toThrow('invalid');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});

describe('saveConfig', () => {
  it('saves config to kobana.json', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'kobana-test-'));
    try {
      await saveConfig(
        {
          componentDir: 'src/components/kobana',
          typescript: true,
          alias: '@/components/kobana',
          shadcnAlias: '@/components/ui',
          registry: 'https://example.com/registry.json',
          installed: {},
        },
        tmpDir,
      );
      const saved = fs.readJSONSync(path.join(tmpDir, 'kobana.json'));
      expect(saved.componentDir).toBe('src/components/kobana');
    } finally {
      fs.removeSync(tmpDir);
    }
  });
});
