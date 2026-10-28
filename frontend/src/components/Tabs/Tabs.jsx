import styles from "./Tabs.module.css";

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className={styles.tabs}>
      <div className={styles.tabList} role="tablist" aria-label="PlanetVerse sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}