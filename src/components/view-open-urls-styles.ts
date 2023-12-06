import { css } from "lit";

export const styles = css`
  .open-urls-form {
    display: flex;
    height: 100%;
    flex-direction: column;
    & textarea {
      display: block;
      width: 100%;
      box-sizing: border-box;
      resize: none;
      background: transparent;
      border: 1px solid var(--border-color);
      line-height: 17px;
      font-size: 13px;
      padding: 10px 10px 30px;
      color: var(--text-color);
      resize: none;
      height: 100%;
      white-space: pre;
      overflow: auto;
    }
    & button {
      border: 0;
      color: var(--text-color);
      background: var(--border-color);
      margin-top: 10px;
      height: 40px;
      cursor: pointer;
      transition: background-color 0.25s ease-in;
      &:hover:not(:disabled) {
        background: var(--focus-color);
      }
      &:disabled {
        cursor: default;
        opacity: 0.5;
      }
    }
    & textarea,
    & button {
      &:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -2px;
      }
    }
  }
`;
