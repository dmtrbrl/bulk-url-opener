import { css } from "lit";

export const styles = css`
  .history {
    & details {
      border: 1px solid var(--border-color);
      &:not(:first-child) {
        margin-top: 10px;
      }
      & summary {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        padding: 10px;
        &:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: -1px;
        }
        & svg {
          width: 12px;
          height: 12px;
          margin-right: 10px;
          fill: currentColor;
          transition: all 0.25s;
        }
        & span:last-child {
          margin-left: auto;
        }
      }
      & ul {
        padding: 10px;
        margin: 0;
        border-top: 1px solid var(--border-color);
        overflow: auto;
        max-height: 200px;
        & li {
          white-space: nowrap;
          margin-left: 10px;
        }
      }
      & footer {
        padding: 10px;
        border-top: 1px solid var(--border-color);
        & button {
          appearance: none;
          border: 0;
          padding: 0;
          background: transparent;
          color: var(--text-color);
          cursor: pointer;
          display: inline-flex;
          gap: 5px;
          align-items: center;
          opacity: 0.6;
          transition: all 0.25s ease-in;
          &:hover,
          &:focus-visible {
            opacity: 1;
          }
          &:focus-visible {
            outline: 2px solid var(--primary-color);
            outline-offset: 3px;
          }
          & svg {
            fill: currentColor;
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }
  .history details[open] summary svg {
    transform: rotate(90deg);
  }
  .history-empty {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
  }
`;
