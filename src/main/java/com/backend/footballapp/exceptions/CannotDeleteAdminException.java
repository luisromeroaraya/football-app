package com.backend.footballapp.exceptions;

public class CannotDeleteAdminException extends IllegalArgumentException{
    private final Class<?> clazz;
    private final Object object;

    public CannotDeleteAdminException(Class<?> clazz, Object object) {
        super("Cannot delete " + clazz.getSimpleName()+ " because " + object + " has 'ROLE_ADMIN'");
        this.clazz = clazz;
        this.object = object;
    }

    public Class<?> getClazz() {
        return clazz;
    }

    public Object getObject() {
        return object;
    }
}
