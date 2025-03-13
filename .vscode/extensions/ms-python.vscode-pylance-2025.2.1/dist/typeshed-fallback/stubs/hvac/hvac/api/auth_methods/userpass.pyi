from _typeshed import Incomplete

from hvac.api.vault_api_base import VaultApiBase

DEFAULT_MOUNT_POINT: str

class Userpass(VaultApiBase):
    def create_or_update_user(
        self, username, password: Incomplete | None = None, policies: Incomplete | None = None, mount_point="userpass", **kwargs
    ): ...
    def list_user(self, mount_point="userpass"): ...
    def read_user(self, username, mount_point="userpass"): ...
    def delete_user(self, username, mount_point="userpass"): ...
    def update_password_on_user(self, username, password, mount_point="userpass"): ...
    def login(self, username, password, use_token: bool = True, mount_point="userpass"): ...
