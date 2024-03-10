import { useFetchAdvice } from "../../hooks/useFetchAdvice";
import { useScreenWidth } from "../../hooks/useScreenWidth";

import styles from "./Generator.module.css";

function Generator() {
    const { isLoading, isError, error, advice, fetchAdvice } = useFetchAdvice();
    const width = useScreenWidth();

    return (
        <main className={styles.container}>
            {isLoading ? (
                <div className={styles.text}>Loading...</div>
            ) : isError ? (
                <div className={styles.error}>{error instanceof Error ? error.message : error}</div>
            ) : (
                <>
                    <h1 className={styles.title}>{`ADVICE #${advice?.id}`}</h1>
                    <div className={styles.text}>&ldquo;{`${advice?.advice}`}&rdquo;</div>
                </>
            )}
            <img src={`pattern-divider-${width < 768 ? "mobile" : "desktop"}.svg`} alt="separator" />
            <button onClick={fetchAdvice}>
                <img src="icon-dice.svg" alt="new advice button" />
            </button>
        </main>
    );
}

export default Generator;
