export default function getCurrentDateFormat(): string {
    const formatDate = new Date().toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        });

    return `${formatDate}`;
}