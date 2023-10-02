export interface SearchBarProps {
	setPatents: React.Dispatch<React.SetStateAction<IPatent[]>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}
