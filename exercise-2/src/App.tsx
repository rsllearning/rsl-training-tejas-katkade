import { Button, Card, Badge } from './components';
import * as styles from './App.css.ts';

export function App() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>UI Component Library</h1>
        <p className={styles.subtitle}>
          A collection of reusable, type-safe React components.
        </p>
      </header>

      {/* Buttons */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Buttons</h2>
          <p className={styles.sectionDescription}>
            Action triggers supporting multiple variants, sizes, and interaction states.
          </p>
        </div>

        <div className={styles.demoRow}>
          <Button variant="primary" size="small">
            Primary Small
          </Button>

          <Button variant="secondary" size="small">
            Secondary Small
          </Button>

          <Button variant="danger" size="small">
            Danger Small
          </Button>

          <Button variant="primary" size="large">
            Primary Large
          </Button>

          <Button variant="secondary" size="large">
            Secondary Large
          </Button>

          <Button variant="danger" size="large">
            Danger Large
          </Button>

          <Button variant="primary" size="small" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Badges */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Badges</h2>
          <p className={styles.sectionDescription}>
            Status indicators used to label state and categories.
          </p>
        </div>

        <div className={styles.demoRow}>
          <Badge variant="success">Operational</Badge>
          <Badge variant="warning">Pending Review</Badge>
          <Badge variant="error">Service Outage</Badge>
        </div>
      </section>

      {/* Cards */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Cards</h2>
          <p className={styles.sectionDescription}>
            Structured containers composed with headers, content, and action footers.
          </p>
        </div>

        <div className={styles.responsiveGrid}>
          {/* Card 1: Elevated */}
          <Card
            variant="elevated"
            title="Analytics Overview"
            headerRight={<Badge variant="success">Active</Badge>}
            footer={
              <>
                <Button variant="secondary" size="small">Details</Button>
                <Button variant="primary" size="small">Export</Button>
              </>
            }
          >
            <p>
              Provides real-time telemetry metrics and active session performance across distributed services.
            </p>
          </Card>

          {/* Card 2: Outlined */}
          <Card
            variant="outlined"
            title="Purchase Approvals"
            headerRight={<Badge variant="warning">Pending</Badge>}
            footer={
              <>
                <Button variant="secondary" size="small">Dismiss</Button>
                <Button variant="primary" size="small">Review</Button>
              </>
            }
          >
            <p>
              Recent requisition orders awaiting department manager approval and accounting sign-off.
            </p>
          </Card>

          {/* Card 3: Flat */}
          <Card
            variant="flat"
            title="System Alert"
            headerRight={<Badge variant="error">Critical</Badge>}
            footer={
              <Button variant="danger" size="small">Resolve</Button>
            }
          >
            <p>
              High memory pressure detected on secondary cache node. Immediate investigation recommended.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;
