namespace MoviesAPI.DTOs
{
    public class PaginationDto
    {
        public int Page { get; set; } = 1;

        private int recordsPerPage = 10;
        private readonly int maxAmount = 50;
        public int RecordsPerPage 
        {
            get
            {
                return RecordsPerPage;
            }
            set
            {
                recordsPerPage = (value > maxAmount) ? maxAmount : value;
            }
        }
    }
}