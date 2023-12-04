import { css } from "lit";

export const styles = css`
  .settings {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .settings-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .settings-list-item {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
    &:first-child {
      padding-top: 0;
    }
  }
  .settings-footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    & a:focus-visible {
      outline-color: var(--primary-color);
    }
  }
  .settings-footer-version {
    opacity: 0.6;
    cursor: default;
  }
  .settings-footer-links {
    display: flex;
    gap: 20px;
    & a {
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--text-color);
      text-decoration: none;
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
        width: 16px;
        height: 16px;
        fill: currentColor;
      }
    }
  }
  .switch {
    appearance: none;
    display: block;
    position: relative;
    cursor: pointer;
    width: 38px;
    height: 22px;
    border: 2px solid var(--border-color);
    background: var(--border-color);
    border-radius: 12px;
    transition: all 0.1s ease-out;
    margin: 0;
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      background: var(--light-color);
      border-radius: 9px;
      opacity: 0.7;
      transition: all 0.1s ease-out;
    }
    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    &:checked {
      background: var(--primary-color);
      border-color: var(--primary-color);
      &::after {
        transform: translateX(16px);
        opacity: 1;
      }
    }
  }
  .radio-group {
    display: flex;
    & label {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-left: 15px;
      & input {
        appearance: none;
        display: block;
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background: var(--border-color);
        margin: 0 5px 0 0;
        cursor: pointer;
        transition: all 0.1s ease-out;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 4px;
          left: 4px;
          width: 10px;
          height: 10px;
          background: transparent;
          border-radius: 5px;
          transition: all 0.1s ease-out;
        }
        &:focus-visible {
          outline: 2px solid var(--primary-color);
          outline-offset: 2px;
        }
        &:checked {
          background: var(--primary-color);
          &::after {
            background: var(--light-color);
          }
        }
      }
    }
  }
  button {
    appearance: none;
    background: transparent;
    border: 1px solid currentColor;
    color: var(--text-color);
    border-radius: 0;
    box-shadow: none;
    cursor: pointer;
    line-height: 1.5rem;
    padding: 0 10px;
    transition: all 0.25s ease-in;
    &:hover:not(:disabled) {
      color: var(--primary-color);
    }
    &:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    &:disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
  dialog {
    margin: 0 20px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    color: var(--text-color);
    &::backdrop {
      background-color: var(--background-color);
      backdrop-filter: blur(7px);
    }
    & p {
      text-align: center;
      margin: 10px 0 15px;
      line-height: 1.2rem;
    }
    & footer {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
  }
`;
