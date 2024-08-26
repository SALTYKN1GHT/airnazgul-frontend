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
export function parseToProfPicsNames(destination: string): string {
  return destination
    .toLocaleLowerCase()
    .split(' ')
    .join('-')
    .split("'")
    .join('');
}
export function isDescendant(childNode: Node, parentNode: Node): boolean {
  if (childNode === parentNode) return true;
  if (childNode === document.body || childNode.parentElement === null)
    return false;

  return isDescendant(childNode.parentElement, parentNode);
}
