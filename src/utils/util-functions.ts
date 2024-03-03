import { EventEmitter } from '@angular/core';
import { HttpService } from 'src/services/http.service';

export function onSubmit({
  callback,
  endpoint,
  httpService,
  payload,
}: {
  payload: Record<string, unknown>;
  endpoint: string;
  httpService: HttpService;
  callback: (data: unknown) => void;
}) {
  httpService.post(endpoint, payload).subscribe(callback);
}
export function closeModal(
  isVisible: boolean,
  emitter?: EventEmitter<boolean>
) {
  console.log(isVisible);
  isVisible = false;
  emitter?.emit(false);
  console.log(isVisible);
}
