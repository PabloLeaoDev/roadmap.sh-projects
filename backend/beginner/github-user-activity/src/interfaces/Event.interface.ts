interface Count {
	date: string,
	total: number
}

interface Repo {
	name: string,
	count: Count[]
}

export default interface Event {
	type: string,
	repos: Repo[]
}