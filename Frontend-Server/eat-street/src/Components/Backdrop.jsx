import styles from "./Backdrop.module.css";
let Backdrop=({children,blur,onClick})=>{
    return (
    <div className={blur?styles.back:styles.notback} onClick={onClick}>{children}</div>
    )
}
export default Backdrop;