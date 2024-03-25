type InputType =
    | "text"
    | "multiline"
    | "file"
    | "date"
    | "time"
    | "number"
    | "color"
    | "range"
    | "search"
    | "email"
    | "password"
    | "tel";

interface TextInputProps {
    id: string;
    label: string;
    placeholder?: string;
    type?: InputType;
    helperText?: string;
}

export default function TextInput({
    id,
    helperText,
    label,
    placeholder,
    type = "text"
}: TextInputProps) {
    return (
        <label htmlFor={id} className="form-group">
            <span className="label">{label}</span>
            {helperText && <em className="helper-text">{helperText}</em>}
            {type === "multiline" ? (
                <textarea id={id} name={id} placeholder={placeholder || ""} />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    placeholder={placeholder || ""}
                />
            )}
        </label>
    );
}
