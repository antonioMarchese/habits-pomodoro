import isBefore from "date-fns/isBefore";
import startOfDay from "date-fns/startOfDay";
import format from "date-fns/format";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default function formatCycleCreatedAt(createdAt: Date) {
  return isBefore(new Date(createdAt), startOfDay(new Date()))
    ? format(new Date(createdAt), "dd/MM/yyyy")
    : formatDistanceToNow(new Date(createdAt), {
        addSuffix: true,
        locale: ptBR,
      });
}
