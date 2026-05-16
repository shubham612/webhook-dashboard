interface Props {
    message: string;
  }
  
  export default function EmptyState({ message }: Props) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <p className="text-gray-500 text-lg">
          {message}
        </p>
      </div>
    );
  }