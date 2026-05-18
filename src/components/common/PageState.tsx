import Loader from "./Loader";
import EmptyState from "./EmptyState";

interface Props {
  loading: boolean;

  isEmpty: boolean;

  emptyMessage: string;

  children: React.ReactNode;
}

export default function PageState({
  loading,
  isEmpty,
  emptyMessage,
  children,
}: Props) {
  if (loading) {
    return <Loader />;
  }

  if (isEmpty) {
    return (
      <EmptyState message={emptyMessage} />
    );
  }

  return <>{children}</>;
}