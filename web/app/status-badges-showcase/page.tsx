export default function StatusBadgesShowcase() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Status Badges Showcase</h1>
      <p className="text-muted-foreground">
        Verify status badges in light and dark themes. Toggle theme to validate contrast.
      </p>
      <div className="flex flex-wrap gap-3 items-center">
        <span
          data-badge="status-success"
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium"
          style={{
            color: 'var(--ul-color-status-success)',
            backgroundColor: 'var(--ul-color-status-success-bg)',
          }}
        >
          Success
        </span>
        <span
          data-badge="status-warning"
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium"
          style={{
            color: 'var(--ul-color-status-warning)',
            backgroundColor: 'var(--ul-color-status-warning-bg)',
          }}
        >
          Warning
        </span>
        <span
          data-badge="status-error"
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium"
          style={{
            color: 'var(--ul-color-status-error)',
            backgroundColor: 'var(--ul-color-status-error-bg)',
          }}
        >
          Error
        </span>
        <span
          data-badge="status-info"
          className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium"
          style={{
            color: 'var(--ul-color-status-info)',
            backgroundColor: 'var(--ul-color-status-info-bg)',
          }}
        >
          Info
        </span>
      </div>
    </main>
  );
}
