import DatePicker from 'react-datepicker';
import Link from 'next/link';

function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Lógica de reserva pendiente de implementación

  return (
    <div>
      {/* Mostrar información del producto */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
      />
      <Link href="/confirm-reservation">
        <a>Reservar</a>
      </Link>
    </div>
  );
}

useEffect(() => {
    fetchAvailability()   
  }, []); 



export default ReservationPage;